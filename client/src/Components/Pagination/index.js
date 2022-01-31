import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import style from './style.module.css'


const Pagination = ({ currentPage, nbPages, setPage }) => {
    return <div className={style['pagination'] + ' d-flex'}>
        {nbPages !== 0 && <>
            <div className={`small-text d-flex align-items-center cursor-pointer ${currentPage === 1 ? 'grey-text ' + style['disabled'] : ''}`}
                onClick={e => { setPage(currentPage - 1) }}><FiChevronLeft /> Préc..</div>
            {
                nbPages < 6 ? <>
                    {Array.from(Array(nbPages).keys()).map((i) => {
                        return <div key={i} className={`small-text ${style['pagination-item']} ${currentPage === i + 1 ? style['selected'] : ''}`}
                            onClick={e => setPage(i + 1)}>{i + 1}</div>
                    })}
                </>
                    : currentPage === 1 || currentPage === 2 || currentPage === nbPages - 1 || currentPage === nbPages ?
                        <>
                            <div className={`small-text ${style['pagination-item']} ${currentPage === 1 ? style['selected'] : ''}`}
                                onClick={e => setPage(1)}>1</div>
                            <div className={`small-text ${style['pagination-item']} ${currentPage === 2 ? style['selected'] : ''}`}
                                onClick={e => setPage(2)}>2</div>
                            <div className={`small-text ${style['pagination-item']}`}>...</div>
                            <div className={`small-text ${style['pagination-item']} ${currentPage === nbPages - 1 ? style['selected'] : ''}`}
                                onClick={e => setPage(nbPages - 1)}>{nbPages - 1}</div>
                            <div className={`small-text ${style['pagination-item']} ${currentPage === nbPages ? style['selected'] : ''}`}
                                onClick={e => setPage(nbPages)}>{nbPages}</div>
                        </>
                        : <>
                            <div className={`small-text ${style['pagination-item']}`}
                                onClick={e => setPage(1)}>1</div>
                            <div className={`small-text ${style['pagination-item']}`}>...</div>
                            <div className={`small-text ${style['pagination-item']} ${style['selected']}`}
                                onClick={e => setPage(currentPage)}>{currentPage}</div>
                            <div className={`small-text ${style['pagination-item']}`}>...</div>
                            <div className={`small-text ${style['pagination-item']}`}
                                onClick={e => setPage(nbPages)}>{nbPages}</div>
                        </>

            }
            <div className={`small-text d-flex align-items-center cursor-pointer ${currentPage === nbPages ? 'grey-text ' + style['disabled'] : ''}`}
                onClick={e => { setPage(currentPage + 1) }}>Suiv.. <FiChevronRight /></div>
        </>}
    </div>
}

export default Pagination