//PoAViewContent.tsx
import React, { useEffect, RefObject } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { usePoAState } from './PoAStateContext';

interface PoAViewContentProps {
  alreadyEnabled: boolean;
  isPoARunning: boolean;
  enablePoA: () => void;
  updatePoA: () => void;
  runPoA: () => void;
  terminalRef: RefObject<HTMLDivElement>;
}

export const PoAViewContent: React.FC<PoAViewContentProps> = ({
                                                                alreadyEnabled,
                                                                isPoARunning,
                                                                enablePoA,
                                                                updatePoA,
                                                                runPoA,
                                                                terminalRef,
                                                              }) => {
  const { logs } = usePoAState();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.innerHTML = '';
      logs.forEach(log => {
        const newLogElement = document.createElement('div');
        newLogElement.innerHTML = log;
        terminalRef.current.appendChild(newLogElement);
      });
      // Auto scroll to bottom
      terminalRef.current.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, terminalRef]);


  return (
    <div style={{ padding: '5px', overflow: 'hidden' }}>
      <h3>Proof of Access.</h3>
      <p>
        Enable the Proof of Access feature to earn rewards for storing data on your computer.
      </p>
      <p>
        <b>
          By enabling proof of access your ipfs peer ID will be published to your hive profile metadata
        </b>
      </p>
      <p>
        <div>
          {alreadyEnabled ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="enable-proof-of-access-tooltip">Enable or update Proof of Access feature</Tooltip>}
            >
              <Button variant="light"
                      size="sm"
                      onClick={() => {
                        void enablePoA();
                      }}
              >
                <span>Update Peer Id</span>
              </Button>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="enable-proof-of-access-tooltip">Enable or update Proof of Access feature</Tooltip>}
            >
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  void enablePoA();
                }}
              >
                <span>Enable Proof of Access</span>
              </Button>
            </OverlayTrigger>
          )}
        </div>
      </p>
        <p>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="update-proof-of-access-tooltip">Update Proof of Access software</Tooltip>}
            >
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  void updatePoA();
                }}
              >
                <span>Update Proof of Access</span>
              </Button>
            </OverlayTrigger>
          </div>
        </p>
        <p>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="run-proof-of-access-tooltip">{isPoARunning ? 'Shutdown' : 'Start'} Proof of Access software</Tooltip>}
            >
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  void runPoA();
                }}
              >
                <span>{isPoARunning ? 'Shutdown' : 'Start'} Proof of Access</span>
              </Button>
            </OverlayTrigger>
          </div>
        </p>
        <div ref={terminalRef} style={{ height: '500px', width: '100%', backgroundColor: 'black' , color: 'white', overflow: 'auto' }} />
      </div>
  );
};