import App from './app'

function main(){
    try{
        App.listen(3000, 'localhost', ()=>{
            console.log('server online')
        })
    }catch(err){
        console.log('server offline: ', err)
    }
}

main()