import React from 'react';

const ProfileBasicInfoContent = ({name,company,title,loc,companyWeb,personalWeb,social}) => {
    return (
        <div>
            <div className="profileName">{name}</div>
            <div className="profileTitle">{title !== null ? title : null} {company !== null ? `at ${company}`: null}</div>
            <div className="profileLocation mb-3">{loc}</div>
            <div className="profileWeb">{companyWeb  ? `Company Web: ${companyWeb} ` : null}</div>
            <div className="profileWeb">{personalWeb  ? `Personal Web: ${personalWeb} ` : null}</div>

            {
                social
                ? Object.entries(social)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
                    <a
                        key={key}
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={`fab fa-${key} me-2`}></i>
                    </a>
                    ))
                : null
            } 
        </div>
    )
}

export default ProfileBasicInfoContent
