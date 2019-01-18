import axios from "axios";
import { Component } from "react";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import BaseLayout from "../components/layouts/BaseLayout";

class Secret extends Component {
  static getInitialProps() {
    const superSecretValue = "Super Secret Value";

    return { superSecretValue };
  }

  // constructor() {
  //   super();

  //   this.state = { secretData: [] };
  // }

  state = { secretData: [] };

  async componentDidMount() {
    const res = await axios.get("/api/v1/secret");
    const secretData = res.data;

    this.setState({
      secretData
    });
  }

  displaySecretData() {
    const { secretData } = this.state;
    // debugger;

    if (secretData && secretData.length > 0) {
      return secretData.map((data, index) => {
        return (
          <div key={index}>
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        );
      });
    }

    return null;
  }

  render() {
    const { superSecretValue } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I am Secret Page</h1>
          <p>Secret Content Here</p>
          <h2>{superSecretValue}</h2>
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
