
import { Header } from '../Header/Header'
import { NewsComponent } from '../NewsComponent/NewsComponent'
import { Search } from '../Search/Search'
import './TopHitPage.scss'

export const TopHitPage = () => {

    return (
        <div className='contentOfHit'>
            <Header imgName='rightArrow'/>
            <NewsComponent title='Top Hit  Of the week' count={999} />
            <div className='contentOfSongs'>
                <Search />
                {/* აქ ჩაჯდება hit-ები(layouts) */}
            </div>
        </div>
    )
}