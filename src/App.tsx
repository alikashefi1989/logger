import { useEffect, useState } from "react"

const App = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '50px',
        backgroundColor: 'black',
        color: 'white',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <UserAgent />
      <AppCodeName />
      <AppName />
      <AppVersion />
      <Platform />
      <CookieEnabled />
      <Connection />
    </div>
  )
}

export default App


const UserAgent = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >userAgent : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.userAgent}</span>
  </div>
}

const AppCodeName = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >appCodeName : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.appCodeName}</span>
  </div>
}

const AppName = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >appName : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.appName}</span>
  </div>
}

const AppVersion = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >appVersion : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.appVersion}</span>
  </div>
}

const Platform = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >platform : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.platform}</span>
  </div>
}

const CookieEnabled = () => {
  return <div>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'white',
      }}
    >cookieEnabled : </span>
    <span
      style={{
        fontSize: '25px',
        fontWeight: 900,
        color: 'red'
      }}
    >{typeof window === 'object' && window.navigator.cookieEnabled ? 'true' : 'false'}</span>
  </div>
}

const Connection = () => {
  const [status, setStatus] = useState<{
    downlink: number,
    effectiveType: string,
    rtt: number,
    saveData: boolean
  } | null>(null);

  useEffect(() => {

    if (window && window.navigator && ('connection' in window.navigator)) {
      setStatus({
        downlink: (window.navigator.connection as any).downlink,
        effectiveType: (window.navigator.connection as any).effectiveType,
        rtt: (window.navigator.connection as any).rtt,
        saveData: (window.navigator.connection as any).saveData
      })
    }

    const interval = setInterval(() => {
      if (window && window.navigator && ('connection' in window.navigator)) {
        setStatus({
          downlink: (window.navigator.connection as any).downlink,
          effectiveType: (window.navigator.connection as any).effectiveType,
          rtt: (window.navigator.connection as any).rtt,
          saveData: (window.navigator.connection as any).saveData
        })
      }
    }, 3000);

    return () => {
      clearInterval(interval)
    }
  }, []);

  return <div
    style={{
      boxSizing: 'border-box',
      padding: '30px',
      border: '5px solid blue',
      marginTop: '10px',
      height: 'max-content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: '5px',
    }}
  >
    <div
      style={{
        width: '100%'
      }}
    >
      <span
        style={{
          fontSize: '25px',
          fontWeight: 900,
          color: 'white',
        }}
      >connection : </span>
      <span
        style={{
          fontSize: '25px',
          fontWeight: 900,
          color: 'red'
        }}
      >{typeof window !== 'object' || !window.navigator.onLine ? 'offLine' : 'onLine'}</span>
    </div>
    <Detail status={status} />
  </div>
}

interface Props {
  status: {
    downlink: number,
    effectiveType: string,
    rtt: number,
    saveData: boolean
  } | null
}

const Detail = (props: Props) => {
  if (props.status === null) return <></>;
  if (!window.navigator.onLine) return <></>
  return <>
    {(Object.keys(props.status) as Array<keyof { downlink: number, effectiveType: string, rtt: number, saveData: boolean }>)
      .map((key: keyof { downlink: number, effectiveType: string, rtt: number, saveData: boolean }) => {
        return <div
          style={{
            width: '100%'
          }}
          key={key}
        >
          <span
            style={{
              fontSize: '25px',
              fontWeight: 900,
              color: 'white',
            }}
          >{`${key} : `}</span>
          <span
            style={{
              fontSize: '25px',
              fontWeight: 900,
              color: 'red'
            }}
          >{valueReturner(props.status === null ? undefined : props.status[key])}</span>
        </div>
      })}
  </>
}

const valueReturner = (value: string | boolean | number | undefined): string => {
  if (typeof value === 'undefined') return '';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'boolean') {
    if (value) {
      return 'true';
    } else {
      return 'false';
    }
  }
  return value;
}