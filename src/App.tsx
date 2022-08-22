import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import './App.css'
import I18NextHttpBackend from 'i18next-http-backend';

const Content = lazy(() => import('./Content'));

i18n
  .use(I18NextHttpBackend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'translation',
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });

function App() {
  const [count, setCount] = useState(0)
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('welcome')}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {!isContentVisible && (
          <button onClick={() => setIsContentVisible(true)}>
            Load Content
          </button>
        )}

        {isContentVisible && <Suspense fallback={<div>Loading...</div>}><Content /></Suspense>}
        <button onClick={() => {
          i18n.changeLanguage(i18n.language === 'id' ? 'en' : "id")
        }}>
          Change Lang
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
