(() => {
  const userOnline=localStorage.getItem("userOnline")
  const isAutorizated=localStorage.getItem("isAutorizated")
  if (userOnline===null || userOnline==="" || isAutorizated===null || isAutorizated==="" || isAutorizated==="false") {
    window.location.href="/"
  }
})()