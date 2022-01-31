import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast as tst } from 'react-toastify';

const toast = (type, text) => {
    return tst(<div className='d-flex flex-row align-items-center gap-3'>
        {type === 'success' ? <FiCheckCircle className='icon' /> : <FiXCircle className='icon' />}
        {text}
    </div>, { className: `my-toast ${type}` })
}

export default toast