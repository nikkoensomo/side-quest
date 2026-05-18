const StatusBadge = ({ status }) => {
    const variants = {
        open: 'bg-emerald-50 text-emerald-700',
        accepted: 'bg-sky-50 text-sky-700',
        'in-progress': 'bg-amber-50 text-amber-700',
        completed: 'bg-zinc-100 text-zinc-700',
        cancelled: 'bg-rose-50 text-rose-700'
    };

    return (
        <>
            <span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${variants[status]}`}>
                {status}
            </span>
        </>
    )
}

export default StatusBadge;