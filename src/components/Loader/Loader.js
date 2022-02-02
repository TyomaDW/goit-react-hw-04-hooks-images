import { useState } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Loader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#ffffff');

  return (
    <Loader>
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input
        value={color}
        onChange={input => setColor(input.target.value)}
        placeholder="Color of the loader"
      />

      <ClipLoader color={color} loading={loading} css={override} size={150} />
    </Loader>
  );
}

export default Spinner;
