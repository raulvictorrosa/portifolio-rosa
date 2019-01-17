import React from "react";

export default function(Component) {
  return class withAtuh extends React.Component {
    alertMessage() {
      alert("some message!!!");
    }

    render() {
      const someVariable1 = "1";
      const someVariable2 = "2";

      return (
        <Component
          someVariable1={someVariable1}
          someVariable2={someVariable2}
          alertMessage={this.alertMessage}
          {...this.props}
        />
      );
    }
  };
}
