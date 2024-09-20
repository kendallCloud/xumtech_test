import '../src/styles.scss';
import Chatbot from './components/chatbot'

export default function App() {
  return (
    <>
      <img style={{ maxWidth: '50%', paddingLeft:'25%'}} src="" alt="SVG LOGO" />
      <div className='row'>
            <Chatbot/>
      </div>
    </>
  );
}