function calculateDifference(items) {
  return items.map(item => {
    const union = calculateUnion(items.filter(it => it != item))
    const { max: iMax, min: iMin } = item
    const { max: uMax, min: uMin } = union

    // 假定两个必定有交集,且item非union的真子集
    const intersect = {
      max: Math.min(iMax, uMax),
      min: Math.max(iMin, uMin),
    }
    console.log(item, union, intersect);

    // 求交集和item的差集
    let max, min
    if (intersect.max === item.max) {
      max = intersect.min
      min = item.min
    } else if (intersect.min === item.min) {
      max = item.max
      min = intersect.max
    }
    return {
      ...item,
      max, min
    }
  });
}

function calculateUnion(items) {
  if (items.length === 1) {
    return items[0]
  }
  const first = items[0]
  const second = items[1]

  const { max: fMax, min: fMin } = first;
  const { max: sMax, min: sMin } = second;
  // 假定两个必定有交集
  const max = Math.max(fMax, sMax)
  const min = Math.min(fMin, sMin)
  return calculateUnion([{ max, min }, ...(items.slice(2))])
}

// 示例数据
const items = [
  { max: 10, min: 5 },
  { max: 8, min: 3 },
  { max: 6, min: 2 }
];

// 计算每个项与其他剩余项并集的补集
const result = calculateDifference(items);

console.log(result);
