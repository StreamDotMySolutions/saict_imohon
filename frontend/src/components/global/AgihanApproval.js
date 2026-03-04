const agihanStepLabel = (step, status) => {
    if (step === 0)                                return { text: 'Belum Dihantar',     bg: 'secondary' };
    if (step === 1 && status === 'pending')        return { text: 'Menunggu Pelulus 2', bg: 'warning'   };
    if (step === 2 && status === 'approved')       return { text: 'Diluluskan',         bg: 'success'   };
    if (step === 2 && status === 'rejected')       return { text: 'Ditolak',            bg: 'danger'    };
    return { text: 'Belum Mohon', bg: 'secondary' };
};

export function AgihanApprovalStatus({ step, currentStatus }) {
    const { text, bg } = agihanStepLabel(step, currentStatus);
    const textColor = bg === 'warning' ? 'dark' : 'white';

    return (
        <span className={`badge text-${textColor} bg-${bg}`}>
            {text}
        </span>
    );
}
