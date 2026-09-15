import { Star, MessageSquare } from "lucide-react";
import type { ReviewResponse } from "../../services/reviewService";

interface ReviewListProps {
    reviews: ReviewResponse[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="empty-state">
                <MessageSquare size={32} className="empty-icon" />
                <p>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="review-list">
            {reviews.map((review) => (
                <div key={review.id} className="review-card" style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span className="reviewer-name" style={{ fontWeight: '600' }}>
                            {review.reviewerName || `User #${review.reviewerId}`}
                        </span>
                        <div className="review-rating" style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={16}
                                    fill={star <= review.rating ? "var(--primary)" : "none"}
                                    color={star <= review.rating ? "var(--primary)" : "var(--border-strong)"}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="review-comment" style={{ margin: 0, color: 'var(--muted)' }}>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
