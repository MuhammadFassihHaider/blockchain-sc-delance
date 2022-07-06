import express from "express";
const router = express.Router();

type TRejectedRequests = {
    freelancerAddress: string;
    employerAddress: string;
};
export const rejectedRequests: TRejectedRequests[] = [];

router.post("/reject-freelancer-work", async (req, res) => {
    rejectedRequests.push(req.body);
    res.send(rejectedRequests);
});

export default router;
