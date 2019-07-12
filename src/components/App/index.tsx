import React, { useState, useEffect } from 'react';
import Rules from './Rules';
import Header from './Header';
import Description from './Description';
import EventInfo from './EventInfo';
import Footer from './Footer';
import Sweepstake from '../Sweepstake';
import Raffle from '../Raffle';

import { processSubmissions } from '../../utils/validation';
import { calculateDateDiff, isEventOpen } from '../../utils/dates';
import { fetchCurrentPrize } from '../../utils/general';
import { ContestSubmission } from '../../interfaces/general';
import { meta, event } from '../../config';

const App: React.FC = () => {
  const [eventIsOpen, setEventIsOpen] = useState<boolean>(isEventOpen(event.contestClosed));
  const [submissions, setSubmissions] = useState<ContestSubmission[]>([]);
  const [deadline, setDeadline] = useState<string>(calculateDateDiff(event.contestClosed));
  const [prizePool, setPrizePool] = useState<number>(0);

  useEffect(() => {
    document.title = meta.eventName;

    const updatePrizePool = async (): Promise<void> => {
      const currentPrizePool = await fetchCurrentPrize().catch(err => console.error(err));
      if (currentPrizePool) setPrizePool(currentPrizePool);
    };

    const updateSubmissions = async (): Promise<void> => {
      const updatedSubmissions: ContestSubmission[] | void = await processSubmissions().catch(err =>
        console.error(err)
      );
      if (updatedSubmissions && updatedSubmissions.length !== submissions.length)
        setSubmissions(updatedSubmissions);
    };

    updatePrizePool();
    updateSubmissions();
    setDeadline(calculateDateDiff(event.contestClosed));
    setEventIsOpen(isEventOpen(event.contestClosed));

    let slowInterval: any;
    let fastInterval: any;

    if (eventIsOpen) {
      fastInterval = setInterval((): void => {
        setDeadline(calculateDateDiff(event.contestClosed));
        setEventIsOpen(isEventOpen(event.contestClosed));
      }, 1000);

      slowInterval = setInterval((): void => {
        updatePrizePool();
        updateSubmissions();
      }, 10000);
    }

    return (): void => {
      clearInterval(fastInterval);
      clearInterval(slowInterval);
    };
  }, [submissions]);

  return (
    <>
      <div className="container animated fadeIn slow">
        <Header eventName={meta.eventName} eventSubheader={meta.eventSubheader} />
        <div className="context">
          <Description description={meta.description} />
          <div className="row">
            <div className="col-md-12 col-lg-6 mb-5">
              <EventInfo
                prizePool={prizePool}
                deadline={deadline}
                eventIsOpen={eventIsOpen}
                participants={submissions.length}
              />
            </div>
            <div className="col-md-12 col-lg-6 mb-5">
              <Rules rules={meta.rules} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              {event.type === 'sweepstake' && (
                <Sweepstake eventIsOpen={eventIsOpen} submissions={submissions} />
              )}
              {event.type === 'raffle' && (
                <Raffle submissions={submissions} eventIsOpen={eventIsOpen} />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
