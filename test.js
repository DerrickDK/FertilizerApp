'use strict';

$(_ => {
  const solve = (matrix, freeTerms) => {
    if (matrix.length == 1) {
      return [freeTerms[0] / matrix[0]];
    } else if (matrix.length == 2) {
      let [[a1, b1], [a2, b2]] = matrix,
          [c1, c2] = freeTerms,
          D = a1 * b2 - b1 * a2,
          x = (c1 * b2 - b1 * c2) / D,
          y = (a1 * c2 - c1 * a2) / D;
      
      return [x, y];
    } else if (matrix.length == 3) {
      let [[a, b, c], [l, m, n], [p, q, r]] = matrix,
          [d, k, s] = freeTerms.map(v => -v),
          D =  (a*m*r + b*p*n + c*l*q) - (a*n*q + b*l*r + c*m*p),
          x = ((b*r*k + c*m*s + d*n*q) - (b*n*s + c*q*k + d*m*r)) / D,
          y = ((a*n*s + c*p*k + d*l*r) - (a*r*k + c*l*s + d*n*p)) / D,
          z = ((a*q*k + b*l*s + d*m*p) - (a*m*s + b*p*k + d*l*q)) / D;

      return [x, y, z];
    }
  } // solve

  const rpd = (v1, v2) => {
    return Math.abs(v1 - v2) / ((+v1 + +v2) / 2);
  } // rpd

  const calc = _ => {
    const calcScore = (sn, sp, sk) => {
      let sc;

      if (sn + sp + sk == 0) {
        return 0;
      }
      sc = 100;

      if (rec.N > 0 && sn == 0) {
        sc -= 25;
      } else if (rec.N > 0 && (sn < 0.9 * rec.N || sn > 1.1 * rec.N)) {
        sc -= 10 * rpd(sn, rec.N);
      } else {
        sc -= 5 * rpd(sn, rec.N);
      }

      if (rec.P > 0 && sp == 0) {
        sc -= 25;
      } else if (sp > rec.P * 1.05) {
        sc -= 20 * rpd(sp, rec.P);
      } else {
        sc -= 10 * rpd(sp, rec.P);
      }

      if (rec.K > 0 && sk == 0) {
        sc -= 25;
      } else if (sk < rec.K) {
        sc -= 20 * rpd(sk, rec.K);
      } else {
        sc -= 10 * rpd(sk, rec.K);
      }

      return sc ? Math.min(100, Math.max(0, sc)).toFixed(0) : 0;
    } // calcSore

    let factor = ($('#Unit').val() == 'pounds' ? 1 : 1 / 16) * ($('#SqAc').val() == 'acre' ? 1 : 43560) / $('#Area').val(),
        rec = {
          N: +$('#N').val(),
          P: +$('#P').val(),
          K: +$('#K').val()
        },
        num = {
          N: 0,
          P: 1,
          K: 2
        },
        unit = $('#Unit').val(),
        area = $('#Area').val() + ' ' + $('#SqAc').val(),
        grades = $('#Grades input:checked').parent().map(function() {return $(this).text().trim()}).get().map(g => g.split('-').map(n => +n)),
        solutions = [],
        top = +$('#Top').val(),
        minScore = +$('#MinScore').val();

    $('#OtherGrades').val().trim().split(/\s+/).forEach(grade => {
      grades.push(grade.split('-'));
    });

    $('.NArea').html((rec.N / factor).toFixed(2));
    $('.PArea').html((rec.P / factor).toFixed(2));
    $('.KArea').html((rec.K / factor).toFixed(2));

    $('#Output').hide();

    $('#Output tr:gt(1)').remove();
  
    const match = (parms, grades) => {
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

    for (let i = 0; i < grades.length; i++) {
      match(['N'], [grades[i]]);
      match(['P'], [grades[i]]);
      match(['K'], [grades[i]]);

      for (let j = i + 1; j < grades.length; j++) {
        match(['N', 'P'], [grades[i], grades[j]]);
        match(['N', 'K'], [grades[i], grades[j]]);
        match(['P', 'K'], [grades[i], grades[j]]);

        for (let k = j + 1; k < grades.length; k++) {
          match(['N', 'P', 'K'], [grades[i], grades[j], grades[k]]);
        }
      }
    }

    solutions
      .sort((a, b) => b.score - a.score)
      .filter((solution, i) => i < top && solution.score >= minScore)
      .forEach(solution => $('#Output').append(solution.output).show());
  } // calc

  const events = _ => {
    $('input, select').on('input', calc);

    $('#selectAll').click(function() {
      $('#Grades input').prop('checked', true).change();
      calc();
    });

    $('#clearAll').click(function() {
      $('#Grades input').prop('checked', false);
      calc();
    });

    $('#Submit').click(calc);
  } // events

  getHits('Simplified Fertilizer Calculator');

  events();
  calc();
});