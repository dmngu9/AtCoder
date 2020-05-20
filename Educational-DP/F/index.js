'use strict'

function solve(S, T) {
  var dp = new Array(S.length + 1).fill(0).map(e => new Array(T.length + 1).fill(''))
  for (var i = 1; i <= S.length; i++) {
    for (var j = 1; j <= T.length; j++) {
      if (S[i-1] === T[j-1]) {
        dp[i][j] = dp[i-1][j-1] + S[i-1]
      } else {
        var s = dp[i][j-1].length > dp[i-1][j].length ? dp[i][j-1] : dp[i-1][j]
        dp[i][j] = s
      }
    }
  }
  return dp[S.length][T.length]
}

function main(input) {
  var lines = input.split("\n")
  var S = lines[0]
  var T = lines[1]
  var ans = solve(S,T)
  console.log(ans)
}

main(require('fs').readFileSync('/dev/stdin', 'utf8'));