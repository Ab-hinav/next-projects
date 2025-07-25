'use client'


export default function Calender({ date }: { date: Date }) {

    const getDayinName = (n: number) => {
        switch (n) {
            case 0: return "Sunday"
            case 1: return "Monday"
            case 2: return "Tuesday"
            case 3: return "Wednesday"
            case 4: return "Thursday"
            case 5: return "Friday"
            case 6: return "Saturday"
        }
    }

    const getMonthinName = (n: number) => {
        switch (n) {
            case 0: return "January"
            case 1: return "February"
            case 2: return "March"
            case 3: return "April"
            case 4: return "May"
            case 5: return "June"
            case 6: return "July"
            case 7: return "August"
            case 8: return "September"
            case 9: return "October"
            case 10: return "November"
            case 11: return "December"
        }
    }

return <div className="m-3 border shadow-2xl p-3 w-fit md:w-md text-center" >
    <h3>{getDayinName(date.getDay())}, {date.getDate()} {getMonthinName(date.getMonth())} {date.getFullYear()}</h3>
    <ul>
        <li><div className="flex gap-4">
            <div>time</div>
            <div>content</div>
            </div></li>
            <div className="h-[2px] bg-black w-full"></div>
            <li><div className="flex gap-4">
            <div>time</div>
            <div>content</div>
            </div></li>
           <div className="h-[2px] bg-black w-full"></div>
            <li><div className="flex gap-4">
            <div>time</div>
            <div>content</div>
            </div></li>
            <div className="h-[2px] bg-black w-full"></div>
    </ul>
    </div>



}
