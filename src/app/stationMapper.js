const terminusDirection = '终点站';

function singleMapper(item) {
  return item.mapped ? item : {
    ...item,
    direction: item.direction === terminusDirection
      ? terminusDirection
      : `行车方向：${item.direction}`,
    lineList: item.lineList.split('、'),
    dist: Math.round(item.dist),
    mapped: true,
  };
}

export default function (list) {
  if (Array.isArray(list)) {
    return list.map(singleMapper);
  }

  return singleMapper(list);
}
