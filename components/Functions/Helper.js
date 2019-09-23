export const rpd = (v1, v2) => {
    return Math.abs(v1 - v2) / ((+v1 + +v2) / 2);
  };
  
  export const supplied = (match, grade) => {
    return match ? ((match * grade) / 100).toFixed(0) : "&ndash;";
  };
  
  export const calculateIndividualScore = (sn, sp, sk, recN, recP, recK) => {
    let sc;
  
    if (sn + sp + sk == 0) {
      return 0;
    }
    sc = 100;
  
    if (recN > 0 && sn == 0) {
      sc -= 25;
    } else if (recN > 0 && (sn < 0.9 * recN || sn > 1.1 * recN)) {
      sc -= 10 * rpd(sn, recN);
    } else {
      sc -= 5 * rpd(sn, recN);
    }
  
    if (recP > 0 && sp == 0) {
      sc -= 25;
    } else if (sp > recP * 1.05) {
      sc -= 20 * rpd(sp, recP);
    } else {
      sc -= 10 * rpd(sp, recP);
    }
  
    if (recK > 0 && sk == 0) {
      sc -= 25;
    } else if (sk < recK) {
      sc -= 20 * rpd(sk, recK);
    } else {
      sc -= 10 * rpd(sk, recK);
    }
  
    return Math.min(100, Math.max(0, sc)).toFixed(0);
  };


  export const match = (parms, grades) => {
    const surplusDeficit = (val) => {
      return val.toFixed(2) < 0 ? `<td class="deficit">${Math.abs(val).toFixed(2)}` :
             val.toFixed(2) > 0 ? `<td class="surplus">${Math.abs(val).toFixed(2)}` :
                                  `<td class="exact"  >${Math.abs(val).toFixed(2)}`;
    } // surplusDeficit

    let supplied = {
          N: 0,
          P: 0,
          K: 0
        },
        sd = {
          N: rec.N,
          P: rec.P,
          K: rec.K
        },
        terms = parms.map(parm => rec[parm]),
        matrix = parms.map((parm, i) => grades.map((grade, j) => grades[j][num[parm]])),
        cr = solve(matrix, terms);

    if (cr.every(e => e >= 0 && e < Infinity)) {
      cr.forEach((amt, i) => {
        supplied.N += amt * grades[i][0];
        supplied.P += amt * grades[i][1];
        supplied.K += amt * grades[i][2];
      });

      let s = cr.filter(amt => amt > 0)
                .map((amt, i) => `${(amt * 100 / factor).toFixed(2)} ${unit} of ${grades[i].join('-')}`).join(' plus<br>'),
          score = calcScore(supplied.N, supplied.P, supplied.K);

      solutions.push({
        output: `<tr>
                   <td colspan="7"><em>Recommendation:</em><br>${s}<br>per ${area}
                 <tr>
                   <td>${(supplied.N / factor).toFixed(2)}
                   <td>${(supplied.P / factor).toFixed(2)}
                   <td>${(supplied.K / factor).toFixed(2)}

                   ${surplusDeficit((supplied.N - rec.N) / factor)}
                   ${surplusDeficit((supplied.P - rec.P) / factor)}
                   ${surplusDeficit((supplied.K - rec.K) / factor)}

                   <td>${score}
                `,
        score:  score
      });
    }
  } // match
  