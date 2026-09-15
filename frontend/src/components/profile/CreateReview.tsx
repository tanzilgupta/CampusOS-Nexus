import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import Button from "../common/Button";
import { createReview } from "../../services/reviewService";

interface CreateReviewProps {
    reviewerId: number;
    reviewedUserId: number;
    onReviewAdded: () => void;
}

const CreateReview = ({ reviewerId, reviewedUserId, onReviewAdded }: CreateReviewProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (rating === 0) {
            setError("Please select a rating.");
            return;
        }

        if (!comment.trim()) {
            setError("Please write a comment.");
            return;
        }

        try {
            setIsSubmitting(true);
            setError("");
            
            await createReview(reviewerId, {
                reviewedUserId,
                rating,
                comment: comment.trim()
            });

            setRating(0);
            setComment("");
            onReviewAdded();
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err
                && (err as { response?: { status?: number } }).response?.status === 409) {
                setError("You have already reviewed this user.");
            } else {
                setError("Failed to submit review.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="create-review-form" onSubmit={handleSubmit} style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Leave a Review</h3>
            
            {error && <div className="form-error" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
            
            <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Rating</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                            <Star
                                size={24}
                                fill={(hoverRating || rating) >= star ? "var(--primary)" : "none"}
                                color={(hoverRating || rating) >= star ? "var(--primary)" : "var(--border-strong)"}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience working with this student..."
                    rows={4}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--surface-solid)', color: 'var(--text)', resize: 'vertical' }}
                />
            </div>

            <Button type="submit" disabled={isSubmitting || rating === 0}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
        </form>
    );
};

export default CreateReview;
