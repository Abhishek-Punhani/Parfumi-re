import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import type { Perfume, Review } from "@/types/perfume";

interface ReviewSectionProps {
    perfume: Perfume;
}

const ReviewSection = ({ perfume }: ReviewSectionProps) => {
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: "",
    });

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to your backend
        console.log("Submitting review:", newReview);
        setShowReviewForm(false);
        setNewReview({ rating: 5, comment: "" });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6 p-4 sm:p-6 bg-gray-100 dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Customer Reviews
                </h2>
                <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? "Cancel" : "Write a Review"}
                </Button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-gray-100">
                            Write Your Review
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Rating
                                </label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="p-1"
                                        >
                                            <Star
                                                className={`h-6 w-6 ${
                                                    star <= newReview.rating
                                                        ? "text-yellow-400 fill-current"
                                                        : "text-gray-300 dark:text-gray-600"
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Review
                                </label>
                                <Textarea
                                    value={newReview.comment}
                                    onChange={(e) =>
                                        setNewReview({ ...newReview, comment: e.target.value })
                                    }
                                    placeholder="Share your thoughts about this perfume..."
                                    rows={4}
                                    required
                                    className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                                />
                            </div>
                            <Button type="submit">Submit Review</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {perfume.reviews.length > 0 ? (
                    perfume.reviews.map((review) => (
                        <Card
                            key={review.id}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {review.userName}
                                        </h4>
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < review.rating
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300 dark:text-gray-600"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(review.date)}
                                    </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardContent className="p-6 text-center">
                            <p className="text-gray-500 dark:text-gray-400">
                                No reviews yet. Be the first to review this perfume!
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
