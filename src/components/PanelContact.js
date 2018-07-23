import React from 'react';
import LinkedIn from './LinkedIn';

const PanelContact = () => (
  <div className="row no-gutters justify-content-center">
    <div className="col-10">
      <div className="row no-gutters justify-content-center">
        <p className="panel-contact d-block d-lg-inline-block">815-875-3835</p>
        <span className="contact-pipe d-none d-lg-block">&nbsp;|&nbsp;</span>
        <p className="panel-contact d-block d-lg-inline-block">INFO@LWSCHNEIDER.COM</p>
      </div>
      <div className="row no-gutters justify-content-center d-lg-none">
        <LinkedIn />
      </div>
    </div>
  </div>
);

export default PanelContact
