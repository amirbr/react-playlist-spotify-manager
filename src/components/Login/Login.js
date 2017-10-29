import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';


class Login extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <h2>Login With Spotify</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
