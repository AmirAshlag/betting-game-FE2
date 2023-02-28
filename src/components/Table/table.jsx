import Table from "react-bootstrap/Table";

function ScoresTable({ gameData }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{gameData.teams.home.name}</th>
          <th>{gameData.teams.visitors.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q1</td>
          <td>{gameData.scores.home.linescore[0]}</td>
          <td>{gameData.scores.visitors.linescore[0]}</td>
        </tr>
        <tr>
          <td>Q2</td>
          <td>{gameData.scores.home.linescore[1]}</td>
          <td>{gameData.scores.visitors.linescore[1]}</td>
        </tr>
        <tr>
          <td>Q3</td>
          <td>{gameData.scores.home.linescore[2]}</td>
          <td>{gameData.scores.visitors.linescore[2]}</td>
        </tr>
        <tr>
          <td>Q4</td>
          <td>{gameData.scores.home.linescore[3]}</td>
          <td>{gameData.scores.visitors.linescore[3]}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ScoresTable;
