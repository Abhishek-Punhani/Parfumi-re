import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import { createReview } from "../../../utils/validation";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import ReviewModel from "@/models/Review";
import PerfumeModel from "@/models/Perfume";

interface AuthenticatedRequest extends NextApiRequest {
    user: {
        id: string;
        _id: string;
    };
}

const router = createRouter<AuthenticatedRequest, NextApiResponse>();

router.use(cors());
router.use(auth);

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { perfumeId,rating ,comment } = req.body;
        if (!perfumeId) {
            return res.status(400).json({ error: "Perfume ID is required" });
        }

        const newReview = await createReview(req.user.id, rating, comment);

        const review = await ReviewModel.create(newReview);

        await PerfumeModel.findByIdAndUpdate(perfumeId, {
            $push: { reviews: review._id },
        });

        await db.disconnectDb();
        res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await db.disconnectDb();
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