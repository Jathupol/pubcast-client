// src/components/ActivitySelection.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/ActivitySelection.css'; // Import the separated CSS file
import { MusicNote, Gift, CameraVideo, Image } from 'react-bootstrap-icons'; // Import icons

const ActivitySelection = () => {
  return (
    <Container fluid className="activity-selection-container">
      <h2 className="text-white">Choose an Activity</h2>
      <Row>
        <Col xs={12} sm={6} className="mb-3">
          <Link to="/customer-form" className="activity-button">
            <MusicNote className="activity-icon" /> <span>ขอเพลง + ทิป</span>
          </Link>
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Link to="/giveaway-warp" className="activity-button">
            <Gift className="activity-icon" /> <span>แจกวาร์ป</span>
          </Link>
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Link to="/send-video" className="activity-button">
            <CameraVideo className="activity-icon" /> <span>ส่งวีดดิโอขึ้นจอ</span>
          </Link>
        </Col>
        <Col xs={12} sm={6} className="mb-3">
          <Link to="/advertise-image" className="activity-button">
            <Image className="activity-icon" /> <span>ส่งรูปขึ้นจอ</span>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivitySelection;
