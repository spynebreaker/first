// Five Seasons Windows - Testimonial Section Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial review toggle
    const toggleReviewBtn = document.getElementById('toggleReview');
    const fullReview = document.getElementById('fullReview');

    if (toggleReviewBtn && fullReview) {
        toggleReviewBtn.addEventListener('click', function() {
            const isExpanded = fullReview.classList.contains('expanded');

            if (isExpanded) {
                fullReview.classList.remove('expanded');
                toggleReviewBtn.classList.remove('active');
                toggleReviewBtn.querySelector('span').textContent = 'Read Full Review';
            } else {
                fullReview.classList.add('expanded');
                toggleReviewBtn.classList.add('active');
                toggleReviewBtn.querySelector('span').textContent = 'Hide Full Review';
            }
        });
    }
});
