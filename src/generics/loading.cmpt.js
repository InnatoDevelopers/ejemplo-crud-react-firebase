import React from 'react';


const LoadingCmpt = () => {
    return (
        <div className="container-fluid">
            <div className="row loading-content valign-wrapper">
                <div className="col s12 center-align">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                    <p>Cargando...</p>
                </div>
            </div>
        </div>
    )
}


export default LoadingCmpt;