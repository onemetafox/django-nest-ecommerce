const ExternalAccountLayout = props => {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalAccountLayout;
