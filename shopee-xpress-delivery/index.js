const solution = (array) => {
  const [boardSize, ...boardString] = array.split("\n");
  const [y, x] = boardSize.split(" ").map((val) => +val);

  const board = boardString.map((row) => row.split(" ").map((val) => +val));

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const destination = { y: y - 1, x: x - 1 };
  const visited = Array.from({ length: board.length }, (e) =>
    Array.from({ length: board[0].length }, (e) => false)
  );
  const blackHoles = {};
  board.forEach((row, yIndex) =>
    row.forEach(
      (item, xIndex) =>
        item !== 0 &&
        (blackHoles[item] = [
          ...(blackHoles[item] ?? []),
          { y: yIndex, x: xIndex },
        ])
    )
  );

  // TODO: Using BFS algorithm
  const validRoutes = ([dirY, dirX]) =>
    dirY >= 0 && dirX >= 0 && dirY < board.length && dirX < board[0].length;
  const queue = [{ y: 0, x: 0 }];
  // const stack = [];
  const getAvailableRoute = ({ y, x }) => {
    return directions
      .map(([dirY, dirX]) => [y + dirY, x + dirX])
      .filter(validRoutes);
  };

  // while (queue.length) {
  //   const { y: curY, x: curX } = queue.shift();
  //   visited[curY][curX] = true;

  //   if (curY === destination.y && curX === destination.x) break;

  //   const routes = getAvailableRoute({ y: curY, x: curX });
  //   for (const [routeY, routeX] of routes) {
  //     if (visited[routeY][routeX]) continue;

  //     stack.push({
  //       from: [curY, curX],
  //       value: [routeY, routeX],
  //       isTeleported: false,
  //     });
  //     queue.push({ y: routeY, x: routeX });
  //     visited[routeY][routeX] = true;

  //     if (!board[curY][curX]) continue;

  //     const blackHole = blackHoles[board[curY][curX]];
  //     for (const { y: blackHoleY, x: blackHoleX } of blackHole) {
  //       if (visited[blackHoleY][blackHoleX]) continue;

  //       stack.push({
  //         from: [curY, curX],
  //         value: [blackHoleY, blackHoleX],
  //         isTeleported: true,
  //       });
  //       queue.push({ y: blackHoleY, x: blackHoleX });
  //       visited[blackHoleY][blackHoleX] = true;
  //     }
  //   }
  // }

  // const buildPath = () => {
  //   const path = [];

  //   let from = [destination.y, destination.x];
  //   while (from) {
  //     const parent = stack.find(
  //       ({ from: _, value }) => value.toString() === from.toString()
  //     );

  //     parent &&
  //       path.push({ value: parent.value, isTeleported: parent.isTeleported });
  //     from = parent?.from ?? null;
  //   }

  //   return path;
  // };

  // return buildPath().reduce((total, item) => {
  //   if (!item.isTeleported) total++;
  //   return total;
  // }, 0);

  const floodFill = () => {
    const stepCount = Array.from({ length: board.length }, (e) =>
      Array.from({ length: board[0].length }, (e) => 0)
    );
    visited[0][0] = true;

    while (true) {
      const { y: curY, x: curX } = queue.shift();

      if (curY === destination.y && curX === destination.x) break;

      for (const [dirY, dirX] of directions) {
        const newPos = { y: curY + dirY, x: curX + dirX };

        if (!validRoutes([newPos.y, newPos.x]) || visited[newPos.y][newPos.x])
          continue;

        queue.push({ y: newPos.y, x: newPos.x });
        stepCount[newPos.y][newPos.x] = stepCount[curY][curX] + 1;
        visited[newPos.y][newPos.x] = true;

        if (!board[curY][curX]) continue;

        for (const blackHole of blackHoles[board[curY][curX]]) {
          if (
            !validRoutes([blackHole.y, blackHole.x]) ||
            visited[blackHole.y][blackHole.x]
          )
            continue;

          queue.push({ y: blackHole.y, x: blackHole.x });
          stepCount[blackHole.y][blackHole.x] = stepCount[curY][curX];
          visited[blackHole.y][blackHole.x] = true;
        }
      }
    }
    return stepCount[destination.y][destination.x];
  };
  return floodFill();

  // TODO: Using flood fill algorithm
  // const stepCount = Array.from({ length: board.length }, (e) =>
  //   Array.from({ length: board[0].length }, (e) => 0)
  // );
  // const nextSteps = [[0, 0]];
  // visited[0][0] = true;

  // while (true) {
  //   const [curY, curX] = nextSteps.shift();

  //   if (curY === destination.y && curX === destination.x) break;

  //   for (const [dirY, dirX] of directions) {
  //     const newPos = { y: curY + dirY, x: curX + dirX };

  //     if (
  //       newPos.y < 0 ||
  //       newPos.x < 0 ||
  //       newPos.y >= y ||
  //       newPos.x >= x ||
  //       visited[newPos.y][newPos.x]
  //     )
  //       continue;

  //     nextSteps.push([newPos.y, newPos.x]);
  //     stepCount[newPos.y][newPos.x] = stepCount[curY][curX] + 1;
  //     visited[newPos.y][newPos.x] = true;

  //     if (!board[curY][curX]) continue;

  //     for (const blackHole of blackHoles[board[curY][curX]]) {
  //       if (
  //         blackHole.y < 0 ||
  //         blackHole.x < 0 ||
  //         blackHole.y >= y ||
  //         blackHole.x >= x ||
  //         visited[blackHole.y][blackHole.x]
  //       )
  //         continue;

  //       nextSteps.push([blackHole.y, blackHole.x]);
  //       stepCount[blackHole.y][blackHole.x] = stepCount[curY][curX];
  //       visited[blackHole.y][blackHole.x] = true;
  //     }
  //   }
  // }

  // // return stepCount;
  // return stepCount[destination.y][destination.x];
};

console.log(
  solution(`8 8
0 0 0 0 0 1 0 0
0 1 0 0 0 0 2 0
0 0 0 0 0 0 0 0
0 0 0 1 0 0 0 0
0 0 0 0 0 2 0 2
0 0 0 0 0 0 0 0
0 0 3 0 0 0 0 3
0 0 0 2 0 0 0 0`)
);

console.log(
  solution(`8 8
0 0 1 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 0
0 0 0 0 0 0 0 0`)
);

console.log(
  solution(`8 8
0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 0`)
);
