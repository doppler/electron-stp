import React from 'react';
import { Link } from 'react-router-dom';

const PaletteTest = () => {
  return (
    <div className="PaletteTest">
      <div className="border">
        <h1>Palette Test</h1>
        <p>
          Eu est nostrud ea voluptate pariatur ut aliquip labore nostrud aliqua.
          Consequat consectetur labore ullamco eiusmod culpa occaecat. Cillum
          irure eiusmod voluptate cillum ex occaecat nostrud incididunt velit
          dolore labore occaecat. Mollit culpa non enim voluptate qui cillum
          aliqua qui qui.
        </p>
        <p className="success">This is success</p>
        <p>
          <Link to={'#'}>This is a link</Link>
        </p>
        <p className="warning">This is a warning</p>
        <p className="error">This is an error</p>
      </div>
      <div>
        <form className="clean">
          <fieldset>
            <label>
              Name
              <input id="name" name="name" placeholder="Name" />
            </label>
            <label>
              Invalid
              <input
                id="invalid"
                name="invalid"
                placeholder="Invalid"
                className="invalid"
              />
            </label>
          </fieldset>
          <button>Save</button>
          <button className="warning">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PaletteTest;
