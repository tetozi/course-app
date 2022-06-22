
import './Review.css'

const Review = ({ reviews }) => {

    return (
        <>
            {
                reviews.map(review => (
                    <div className="review-div" key={review._id}>
                        <div className="review-box">
                            <h2 className="review-header">{review.user.username}</h2>
                            <p className="review-text">{review.review}</p>
                        </div>
                    </div>
                )

                )
            }
        </>
    )
}

export default Review