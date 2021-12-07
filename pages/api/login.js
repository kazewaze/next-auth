import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import validateUser from "lib/validateUser";
import Counter from 'lib/counter';
import utils from 'lib/counterUtilities';

export default withIronSessionApiRoute(async (req, res) => {
  const { username, password } = await req.body;
  console.log('entry -- : ', req.session.requests);

  if (!req.session.requests) {
    req.session.requests = new Counter(0);
  }

  try {
    let limitCount = new Counter(0);
    if (req.session.requests._count === req.session.requests._limit) {
      console.log('limitCount OUTSIDE: ', limitCount);
      limitCount._count++;
      // console.log('limitCount OUTSIDE: ', limitCount);
      if (!req.session.requests.startTimer) {
        req.session.requests.startTimer = utils.startTimer;
      }

      req.session.requests.startTimer(req, res, limitCount);

    } else {
      const user = validateUser({ username: username, password: password });
      req.session.user = user;
      await req.session.save();
      res.json(user);
    }
  } catch (error) {
    // Add the increment method if not found.
    // Disappears for some reason after first roundtrip.
    if (!req.session.requests.increment) {
      req.session.requests.increment = utils.increment;
    }
    req.session.requests.increment();
    await req.session.save();
    console.log('Catch: Error ---', req.session.requests);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);