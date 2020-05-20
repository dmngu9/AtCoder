'use strict'

function solve(N, K, A) {
  let dp = new Array(K+1).fill(false)
  for (var i = 1; i <= K; i++) {
    for (var j = 0; j < A.length; j++) {
      if (i < A[j]) {
        break
      }
      dp[i] = dp[i] || !dp[i-A[j]]
    }
  }
  return dp[K]
}

function main(input) {
  var lines = input.split("\n")
  var NK = lines[0].split(' ').map(l => parseInt(l))
  var N = NK[0]
  var K = NK[1]
  var A = lines[1].split(' ').map(l => parseInt(l))
  var ans = solve(N, K, A) ? 'First' : 'Second'
  console.log(ans)
}

main(require('fs').readFileSync('/dev/stdin', 'utf8'));