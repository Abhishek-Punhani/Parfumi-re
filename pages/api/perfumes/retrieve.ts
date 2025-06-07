import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import db from "../../../utils/db";
import PerfumeModel from "@/models/Perfume";
import "@/models/Review";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(cors());

router.get(async (_req, res) => {
    try {
        await db.connectDb();
        const perfumes = await PerfumeModel.find()
            .populate("reviews")
            .sort({ createdAt: -1 });
        return res.status(200).json(perfumes);
    } catch (error) {
        console.error("Error fetching perfumes:", error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        await db.disconnectDb();
    }
});

export default router.handler({
    onError: (err: unknown, _req: NextApiRequest, res: NextApiResponse) => {
        const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
        console.error("API Error:", err);
        res.status(500).json({ error: errorMessage });
    },
});