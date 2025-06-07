import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import db from "@/utils/db";
import UserModel from "@/models/User";
import ReviewModel from "@/models/Review";
import auth from "@/middleware/auth";
import OrderModel  from '@/models/Order';

interface AuthenticatedRequest extends NextApiRequest {
    user: {
        email: string;
    };
}

const router = createRouter<AuthenticatedRequest, NextApiResponse>();

router.use(cors());
router.use(auth);

router.post(async (req, res) => {
    try {
        await db.connectDb();

        const email = req.user.email;
        if (!email) {
            await db.disconnectDb();
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            await db.disconnectDb();
            return res.status(404).json({ message: "User not found" });
        }

        // Check if wishlist has more than one item and populate it if so.
        if (user.wishlist && Array.isArray(user.wishlist) && user.wishlist.length > 1) {
            await user.populate({ path: 'wishlist', model: 'Perfume' });
        }

        const orders = await OrderModel.find({ userId: user._id.toString() });
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum: number, order: any) => {
            return sum + (order.total || 0);
        }, 0);
        const reviewsWritten = await ReviewModel.find({ userId: user._id.toString() });

        const userProfile = {
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
            orders,
            wishlist: user.wishlist,
            addresses: user.addresses,
            totalSpent: totalSpent.toString(),
            totalOrders: totalOrders.toString(),
            reviewsWritten,
        };

        await db.disconnectDb();
        return res.status(200).json(userProfile);
    } catch (error: any) {
        console.error("API error:", error);
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
});

export default router.handler({
    onError: (err: unknown, req: AuthenticatedRequest, res: NextApiResponse) => {
        const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
        console.error("API Error:", err);
        res.status(500).json({ error: errorMessage });
    },
});