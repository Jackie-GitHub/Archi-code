import React from 'react'
//import PropTypes from 'prop-types'

const ProfileModuleItem = ({content})=> {
    return (
        <div className="ProfileModuleItem mt-2">
            <div className="ProfileMItemDate">Aug 2018 - Dec 2018</div>
            <div className="ProfileMItemContent">
                <div>
                    <div className="ProfileMItemTitle textBold">
                    dwp (Design Worldwide Partnership), Bangkok, TH, Architect
                    </div>
                    <button type="button" className="btn btn-danger btn-sm py-0"><i className="fas fa-times" /></button>
                </div>
                <ul>
                    <li>
                    Develop architectural design from a given design concept through to
final design documentation.
                    </li>
                    <li>
                    Review site condition and constraints.
                    </li><li>
                    Source out and select all materials and suppliers.
                    </li><li>
                    Coordinate architectural design with other consultants including 
engineers.
                    </li>
                </ul>
            </div>
        </div>
    )
}

// ProfileModuleItem.propTypes = {

// }

export default ProfileModuleItem
