export const headerStyles = `
.header {
  background-image: linear-gradient(to right, #22bbee, #0033ee);
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px
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
.link:hover, .link:focus {
  color: #33ceff
}
`
