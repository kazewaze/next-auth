/*
*  Counter Utilities to keep track & limit requests.
*/

function increment() {
  this._count++;
}

function startTimer(req, res, limitCount) {
  console.log('limitCount INSIDE: ', limitCount);
  if (limitCount._count === 1) {
    console.log('INSIDE IF');
    setTimeout(() => {
      if (limitCount._count === 1) {
        console.log('INSIDE TIMER + TIMEOUT ---', limitCount);
        this._count = 0;
        req.session.destroy();
        res.json({ isLoggedIn: false, login: "", avatarUrl: "", unlock: true });
      }
      limitCount.increment();
    }, 10000, this, limitCount);
  } else {
    return;
  }
}

const counterUtilities = { increment, startTimer };

export default counterUtilities;