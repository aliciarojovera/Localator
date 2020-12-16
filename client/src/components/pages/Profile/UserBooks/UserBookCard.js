const UserBookCard = ({ elm }) => {
    console.log('MYELM: ', elm)
    return (
        <>
            <div className="bookDay">{new Date(elm.date).getDate() + 1} / {new Date(elm.date).getMonth() + 1} / {new Date(elm.date).getFullYear()}
                <div className="bookHour"> {new Date(elm.date).getHours()} : {new Date(elm.date).getMinutes()}0</div>
            </div>
        </>
    )
}

export default UserBookCard