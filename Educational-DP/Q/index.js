'use strict'

function query(segmentTree, index, ss, se, qs, qe) {
  // if segment tree range is inside query range
  if (ss >= qs && se <= qe) {
    return segmentTree[index]
  }
  // complete outside
  if (qs > se || qe < ss) {
    return 0
  }
  // overlap
  var mid = Math.floor((se - ss) / 2) + ss
  return Math.max(query(segmentTree, 2*index+1, ss, mid, qs, qe), query(segmentTree, 2*index+2, mid+1, se, qs, qe))
}

function update(segmentTree, index, ss, se, qi, val) {
  if (ss === se) {
    segmentTree[index] = val
    return
  }
  var mid = Math.floor((se - ss) / 2) + ss
  if (qi <= mid) {
    update(segmentTree, 2*index+1, ss, mid, qi, val)
  } else {
    update(segmentTree, 2*index+2, mid+1, se, qi, val)
  }
  segmentTree[index] = Math.max(segmentTree[2*index+1], segmentTree[2*index+2])
}

function solve(N, H, A, segmentTree) {
  var maxBeauty = 0
  for (var i = 0; i < N; i++) {
      var maxVal = query(segmentTree, 0, 0, N, 0, H[i]-1) + A[i]
      maxBeauty = Math.max(maxBeauty, maxVal)
      update(segmentTree, 0, 0, N, H[i], maxVal)
  }
  return maxBeauty
}

function main(input) {
  var lines = input.split("\n")
  var N = parseInt(lines[0])
  var H = lines[1].split(' ').map(l => parseInt(l))
  var A = lines[2].split(' ').map(l => parseInt(l))

  // build segment tree
  var treeSize = 2 * Math.pow(2, Math.ceil(Math.log2(N+1))) - 1 
  var segmentTree = new Array(treeSize).fill(0)
  var ans = solve(N, H, A, segmentTree)
  console.log(ans)
}

main(require('fs').readFileSync('/dev/stdin', 'utf8'));
