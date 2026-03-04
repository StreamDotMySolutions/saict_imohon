const mohonStepLabel = (step, status) => {
    if (step === 0)                                return { text: 'Draf',              bg: 'secondary' };
    if (step === 1 && status === 'pending')        return { text: 'Menunggu Pelulus 1', bg: 'warning'   };
    if (step === 2 && status === 'rejected')       return { text: 'Ditolak',            bg: 'danger'    };
    if (step === 2 && status === 'approved')       return { text: 'Diluluskan',         bg: 'info'      };
    if (step === 3 && status === 'pending')        return { text: 'Menunggu Admin',     bg: 'warning'   };
    if (step === 4 && status === 'approved')       return { text: 'Selesai',            bg: 'success'   };
    if (step === 4 && status === 'rejected')       return { text: 'Ditolak',            bg: 'danger'    };
    return { text: 'Belum Memohon', bg: 'secondary' };
};

export function ApproverStatus({ step, currentStatus }) {
    const { text, bg } = mohonStepLabel(step, currentStatus);
    const textColor = bg === 'warning' ? 'dark' : 'white';

    return (
        <span className={`badge text-${textColor} bg-${bg}`}>
            {text}
        </span>
    );
}
