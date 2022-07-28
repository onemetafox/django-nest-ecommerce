const AddReview = props => {
  function activeHandler(e) {
    e.preventDefault();
    document.querySelector('.add-product-review .active') &&
      document
        .querySelector('.add-product-review .active')
        .classList.remove('active');
    e.currentTarget.classList.add('active');
  }
  return (
    <div className="add-product-review">
      <div className="add-product-review">
        <h3 className="review-title">Add a review</h3>

        <form action="#" className="comment-form m-0">
          <div className="rating-form">
            <label htmlFor="rating">
              Your rating <span className="required">*</span>
            </label>
            <span className="rating-stars">
              <a className="star-1" href="#" onClick={activeHandler}>
                1
              </a>
              <a className="star-2" href="#" onClick={activeHandler}>
                2
              </a>
              <a className="star-3" href="#" onClick={activeHandler}>
                3
              </a>
              <a className="star-4" href="#" onClick={activeHandler}>
                4
              </a>
              <a className="star-5" href="#" onClick={activeHandler}>
                5
              </a>
            </span>
          </div>

          <div className="form-group">
            <label>
              Your review <span className="required">*</span>
            </label>
            <textarea
              cols="5"
              rows="6"
              className="form-control form-control-sm"
            ></textarea>
          </div>

          <div className="row">
            <div className="col-md-6 col-xl-12">
              <div className="form-group">
                <label>
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  required
                />
              </div>
            </div>

            <div className="col-md-6 col-xl-12">
              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  required
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="save-name"
                />
                <label
                  className="custom-control-label mb-0"
                  htmlFor="save-name"
                >
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>
            </div>
          </div>

          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddReview;
