import React from 'react';
import { Link } from 'react-router-dom';

const CommentsScreen = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Comments</h1>
      <ul style={styles.list}>
        <li style={styles.item}>Comment 1: Great app!</li>
        <li style={styles.item}>Comment 2: Needs improvement.</li>
        <li style={styles.item}>Comment 3: Awesome design.</li>
      </ul>
      <Link to="/" style={styles.button}>Back to Landing</Link>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    padding: 10,
    borderBottom: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#ffc107',
    color: '#000',
    padding: '10px 20px',
    marginTop: 20,
    textDecoration: 'none',
    borderRadius: 5,
  },
};

export default CommentsScreen;