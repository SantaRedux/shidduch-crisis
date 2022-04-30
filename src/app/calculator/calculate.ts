export const findLeftoverRate = (params: any) => {
    const { start, mAge, fAge, mOtd, fOtd, pctFertile, kidsTotal, fertilityWindow} = params;
    const mOtdDecimal = mOtd / 100;
    const fOtdDecimal = fOtd / 100;
    
    const kidsPerYear = kidsTotal / fertilityWindow;
    const deathRate = 0.012;
    const popPlusYear = pop => pop += (pop * pctFertile * kidsPerYear) - (pop * deathRate);
    const change = popPlusYear(start) - start;
    const rate = change / (start);
    
    const calcGrowth = (start, year) =>  start * (1 + rate) ** year;
    
    const plusGap = calcGrowth(start, mAge - fAge);
    
    let mPop = start * pctFertile * kidsPerYear / 2;
    mPop -= mPop * mOtdDecimal;
    let fPop = plusGap * pctFertile * kidsPerYear / 2;
    fPop -= fPop * fOtdDecimal;
    const leftover = fPop - mPop;
    const leftoverRate = leftover / fPop;

    console.log(`
    mOtd: ${mOtd}
        mPop: ${mPop}, fPop: ${fPop}
    `)
  
    return leftoverRate;
}

// const params = {
//     start: 1000,
//     mAge: 21,
//     fAge: 20,
//     pctFertile: 0.1,
//     kidsTotal: 6, 
//     fertilityWindow: 20
// }

// const _print = findLeftoverRate(params);