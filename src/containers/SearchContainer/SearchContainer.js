import { Form, FormGroup, Col, FormControl, Button, } from 'react-bootstrap';

import React, { Component } from 'react';

const styles = require('./SearchContainer.scss');

export default class SearchContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className={`${styles.smallDesktopGrid} col-md-12 text-center`}>
            <h1>React Playlist Wizard</h1>
          </div>
          <div className={`${styles.smallDesktopGrid} col-md-12`}>
            <Form className={styles.searchBox} horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col md={12}>
                  <FormControl className={styles.inputBox} bsSize="lg" type="text" placeholder="Search artist..." />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col md={12}>
                  <Button className={`${styles.customBtn} text-center`} type="submit" bsSize="large" block>
                    Search Song
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
