import initState from './initState';

export default  localStorage.getItem('userLogged')?{
    userLogged: false,
    userName:'',
    name: '',
    token:''
} : initState.metaData