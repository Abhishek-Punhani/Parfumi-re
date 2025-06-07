import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cors from "cors";
import db from "../../../utils/db";
import PerfumeModel from "@/models/Perfume";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(cors());

router.get(async (req, res) => {
    try {
        const { id } = req.query;
        const perfumeId = Array.isArray(id) ? id[0] : id;

        if (!perfumeId) {
            return res.status(400).json({ error: "ID parameter is required" });
        }

        await db.connectDb();
        const perfume = await PerfumeModel.findById(perfumeId).populate("reviews");
        
        if (!perfume) {
            return res.status(404).json({ error: "Perfume not found" });
        }
        
       return  res.status(200).json(perfume);
    } catch (error) {
        console.error("Error fetching perfume:", error);
       return  res.status(500).json({ error: "Internal server error" });
    } finally {
        await db.disconnectDb();
    }
});

export default router.handler({
    onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
        const errorMessage =
            err instanceof Error ? err.message : "An unknown error occurred";
        console.error("API Error:", err);
        res.status(500).json({ error: errorMessage });
    },
});