export const headerStyles = `
.header {
  background-image: linear-gradient(to left,#22bbee,#0084de);
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 2;
  box-shadow: 0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.15);
}
.container {
  max-width: var(--site-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto;
}
.logo {
  font-style: italic;
}
.nav {
  display: flex;
  justify-content: center;
}
.navItem {
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 0 15px;
  font-size: 2rem
}
.link {
  color: #fff;
}
a:hover, a:focus {
  color: #33ceff
}
`
