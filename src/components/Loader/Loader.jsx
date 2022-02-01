import React from 'react';

import { BallTriangle } from 'react-loader-spinner';

import styles from './Loader.module.scss';

export default function Spinner() {
  return (
    <div className={styles.Loader}>
      <BallTriangle color="#00BFFF" height={100} width={100} timeout={3000} />
    </div>
  );
}
